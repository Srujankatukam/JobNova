"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

interface TavusConversation {
    conversationId: string;
    conversationUrl: string;
    status: string;
    tavusData: any;
}

interface UseTavusPersonaReturn {
    conversation: TavusConversation | null;
    isConnecting: boolean;
    isConnected: boolean;
    error: string | null;
    latency: number | null;
    connectionQuality: "excellent" | "good" | "fair" | "poor" | null;
    startConversation: () => Promise<void>;
    sendMessage: (text: string) => Promise<boolean>;
    endConversation: () => Promise<void>;
}

export function useTavusPersona(): UseTavusPersonaReturn {
    const [conversation, setConversation] = useState<TavusConversation | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [latency, setLatency] = useState<number | null>(null);
    const [connectionQuality, setConnectionQuality] = useState<"excellent" | "good" | "fair" | "poor" | null>(null);

    const callFrameRef = useRef<any>(null);
    const latencyIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const startLatencyMonitoring = useCallback(() => {
        latencyIntervalRef.current = setInterval(() => {
            // Monitor actual network stats if available
            if (callFrameRef.current) {
                callFrameRef.current.getNetworkStats().then((stats: any) => {
                    if (stats && stats.latest) {
                        const rtt = stats.latest.videoRecvPacketLoss || 0;
                        setLatency(Math.round(rtt * 1000));

                        if (rtt < 0.1) setConnectionQuality("excellent");
                        else if (rtt < 0.2) setConnectionQuality("good");
                        else if (rtt < 0.4) setConnectionQuality("fair");
                        else setConnectionQuality("poor");
                    }
                }).catch(() => {
                    // Fallback to mock
                    setLatency(Math.floor(Math.random() * 50) + 50);
                    setConnectionQuality("good");
                });
            }
        }, 3000);
    }, []);

    const stopLatencyMonitoring = useCallback(() => {
        if (latencyIntervalRef.current) {
            clearInterval(latencyIntervalRef.current);
            latencyIntervalRef.current = null;
        }
        setLatency(null);
        setConnectionQuality(null);
    }, []);

    const startConversation = useCallback(async () => {
        try {
            setIsConnecting(true);
            setError(null);

            console.log("Starting Tavus conversation...");

            // Call backend to create Tavus conversation
            const response = await fetch(`${API_BASE_URL}/api/avatar/tavus/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conversation_name: `Interview_${Date.now()}`,
                    custom_greeting: "You are a professional AI interview coach. Help the candidate prepare for their job interview with constructive feedback and encouragement.",
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || "Failed to start conversation");
            }

            const data = await response.json();
            console.log("✓ Tavus conversation started:", data);

            const conversationData: TavusConversation = {
                conversationId: data.conversation_id,
                conversationUrl: data.tavus_data.conversation_url,
                status: data.status,
                tavusData: data.tavus_data,
            };

            setConversation(conversationData);

            // Critical: Set connected TRUE first to render the container div
            setIsConnected(true);
            setIsConnecting(false);
            startLatencyMonitoring();

            // Start polling for the container (to handle Framer Motion transitions)
            const checkContainer = (attempts = 0) => {
                const container = document.getElementById('tavus-container');

                if (container) {
                    console.log("Found container, creating Daily.co frame");

                    // Destroy existing frame if any
                    if (callFrameRef.current) {
                        try {
                            callFrameRef.current.destroy();
                        } catch (e) {
                            console.warn("Error destroying previous frame:", e);
                        }
                    }

                    try {
                        const callFrame = DailyIframe.createFrame(container, {
                            showLeaveButton: false,
                            showFullscreenButton: false,
                            iframeStyle: {
                                width: '100%',
                                height: '100%',
                                border: '0',
                                borderRadius: '8px',
                            },
                            dailyConfig: {
                                userMediaVideoConstraints: {
                                    width: { ideal: 640 },
                                    height: { ideal: 480 },
                                    frameRate: { ideal: 24 }
                                }
                            }
                        });

                        callFrameRef.current = callFrame;

                        callFrame
                            .on('joined-meeting', () => {
                                console.log("✓ Joined Tavus conversation");
                            })
                            .on('left-meeting', () => {
                                console.log("Left Tavus conversation");
                                setIsConnected(false);
                            })
                            .on('error', (e: any) => {
                                console.error("Daily.co error:", e);
                                // Don't show error to user immediately, might be transient
                            });

                        console.log("Joining Tavus room:", conversationData.conversationUrl);
                        callFrame.join({ url: conversationData.conversationUrl })
                            .then(() => console.log("✓ Join successful"))
                            .catch(err => {
                                console.error("Join failed:", err);
                                setError("Failed to join video call");
                            });

                    } catch (err) {
                        console.error("Frame creation error:", err);
                        setError("Failed to initialize video");
                        setIsConnected(false);
                    }
                } else if (attempts < 20) {
                    // Retry every 100ms for 2 seconds
                    setTimeout(() => checkContainer(attempts + 1), 100);
                } else {
                    console.error("Tavus container not found after retries");
                    setError("Video container failed to load (timeout)");
                    setIsConnected(false);
                }
            };

            // Start checking
            setTimeout(() => checkContainer(), 100);

        } catch (err) {
            console.error("Error starting conversation:", err);
            setError(err instanceof Error ? err.message : "Failed to start conversation");
            setIsConnecting(false);
        }
    }, [API_BASE_URL, startLatencyMonitoring]);

    const sendMessage = useCallback(async (text: string): Promise<boolean> => {
        try {
            if (!conversation) {
                console.warn("Cannot send message: no active conversation");
                return false;
            }

            console.log("Sending message via Tavus:", text.substring(0, 50));

            // Send via Daily.co app message using Tavus Interactions Protocol
            if (callFrameRef.current) {
                try {
                    const messagePayload = {
                        message_type: "conversation",
                        event_type: "conversation.respond",  // This treats the text as user input for the AI to answer
                        conversation_id: conversation.conversationId,
                        properties: {
                            text: text
                        }
                    };

                    console.log("Sending Tavus payload:", messagePayload);
                    await callFrameRef.current.sendAppMessage(messagePayload, '*');
                    console.log("✓ Message sent via Daily.co");
                    return true;
                } catch (e) {
                    console.warn("Could not send via Daily.co:", e);
                }
            }

            // Fallback: log to backend
            await fetch(`${API_BASE_URL}/api/avatar/tavus/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conversation_id: conversation.conversationId,
                    text: text,
                }),
            });

            return true;

        } catch (err) {
            console.error("Error sending message:", err);
            setError(err instanceof Error ? err.message : "Failed to send message");
            return false;
        }
    }, [conversation, API_BASE_URL]);

    const endConversation = useCallback(async () => {
        try {
            stopLatencyMonitoring();

            // Leave Daily.co call
            if (callFrameRef.current) {
                await callFrameRef.current.leave();
                await callFrameRef.current.destroy();
                callFrameRef.current = null;
            }

            if (conversation) {
                console.log("Ending Tavus conversation...");

                try {
                    await fetch(`${API_BASE_URL}/api/avatar/tavus/end/${conversation.conversationId}`, {
                        method: "DELETE",
                    });
                } catch (e) {
                    console.warn("Could not end conversation on backend:", e);
                }
            }

            setIsConnected(false);
            setIsConnecting(false);
            setConversation(null);
            setError(null);
            setLatency(null);
            setConnectionQuality(null);

        } catch (err) {
            console.error("Error ending conversation:", err);
        }
    }, [conversation, API_BASE_URL, stopLatencyMonitoring]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (callFrameRef.current) {
                callFrameRef.current.destroy();
            }
        };
    }, []);

    return {
        conversation,
        isConnecting,
        isConnected,
        error,
        latency,
        connectionQuality,
        startConversation,
        sendMessage,
        endConversation,
    };
}
