"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTavusPersona } from "@/hooks/useTavusPersona";

export default function TavusDigitalHuman() {
    const {
        conversation,
        isConnecting,
        isConnected,
        error,
        latency,
        connectionQuality,
        startConversation,
        sendMessage,
        endConversation,
    } = useTavusPersona();

    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messageHistory, setMessageHistory] = useState<Array<{ text: string; timestamp: number }>>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim() || isSending || !isConnected) return;

        setIsSending(true);
        try {
            const success = await sendMessage(text.trim());
            if (success) {
                setMessageHistory(prev => [...prev, { text: text.trim(), timestamp: Date.now() }]);
                setText("");
            }
        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="w-full min-h-full sm:min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col sm:justify-center items-center p-4">
            <div className="max-w-5xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl sm:text-3xl font-bold mb-1">AI Interview Assistant</h1>
                                <p className="text-purple-100 text-xs sm:text-base">Powered by Tavus Persona & LiveKit</p>
                            </div>
                            {isConnected && (
                                <button
                                    onClick={endConversation}
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                                >
                                    End Session
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Avatar Video Container */}
                    <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6 sm:mb-8 aspect-[4/5] sm:aspect-video w-full">
                        <AnimatePresence mode="wait">
                            {isConnecting ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="text-center">
                                        <div className="relative mx-auto w-20 h-20">
                                            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                            <div className="w-16 h-16 border-4 border-pink-500 border-b-transparent rounded-full animate-spin absolute top-2 left-2" style={{ animationDirection: "reverse" }}></div>
                                        </div>
                                        <p className="text-white text-xl font-medium mt-6">Connecting to your AI coach...</p>
                                        <p className="text-gray-400 text-sm mt-2">Setting up real-time session</p>
                                    </div>
                                </motion.div>
                            ) : isConnected ? (
                                <motion.div
                                    key="video"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0"
                                >
                                    {/* Tavus iframe container */}
                                    <div id="tavus-container" className="w-full h-full"></div>

                                    {/* Status Overlay */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                        <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            <span>Live</span>
                                        </div>
                                        {latency !== null && (
                                            <div className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                                                {latency}ms
                                            </div>
                                        )}
                                        {connectionQuality && (
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-lg ${connectionQuality === "excellent" ? "bg-green-500" :
                                                connectionQuality === "good" ? "bg-blue-500" :
                                                    connectionQuality === "fair" ? "bg-yellow-500" :
                                                        "bg-red-500"
                                                } text-white`}>
                                                {connectionQuality}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                >
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-white text-2xl font-bold mb-2">Ready to Start?</p>
                                        <p className="text-gray-400 mb-6">Click below to begin your AI interview coaching session</p>
                                        <button
                                            onClick={startConversation}
                                            disabled={isConnecting}
                                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Start Session
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="m-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
                        >
                            <p className="font-semibold">Error</p>
                            <p className="text-sm mt-1">{error}</p>
                        </motion.div>
                    )}

                    {/* Conversation Info */}
                    {conversation && (
                        <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Session ID:</span>{" "}
                                <span className="font-mono text-xs">{conversation.conversationId.slice(0, 12)}...</span>
                                {" "} • {" "}
                                <span className="capitalize text-green-600 font-medium">{conversation.status}</span>
                            </p>
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="message-input" className="block text-sm font-semibold text-gray-700 mb-2">
                                    {isConnected ? "What would you like to practice?" : "Connect to start chatting"}
                                </label>
                                <textarea
                                    id="message-input"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={isConnected
                                        ? "Type your question or topic... (Press Enter to send, Shift+Enter for new line)"
                                        : "Start a session to begin"}
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    disabled={!isConnected || isSending}
                                    maxLength={5000}
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-500">
                                        {text.length}/5000 characters
                                    </p>
                                    {isConnected && (
                                        <p className="text-xs text-purple-600 font-medium">
                                            Press Enter to send • Shift+Enter for new line
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    type="submit"
                                    disabled={!text.trim() || isSending || !isConnected}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
                                >
                                    {isSending ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </motion.button>
                            </div>
                        </form>

                        {/* Message History */}
                        {messageHistory.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Messages</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {messageHistory.slice(-5).map((msg, idx) => (
                                        <div key={idx} className="p-3 bg-purple-50 rounded-lg text-sm text-gray-700">
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Back Link */}
                    <div className="px-6 pb-6 text-center">
                        <a
                            href="/"
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Job Board
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
