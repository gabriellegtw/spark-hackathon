import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User } from 'lucide-react';

interface CallNursePageProps {
    onEndCall: () => void;
}

export function CallNursePage({ onEndCall }: CallNursePageProps) {
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);
    const [duration, setDuration] = useState(0);

    // Timer effect for call duration
    useEffect(() => {
        const timer = setInterval(() => {
            setDuration((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen w-full bg-warmGray-heading flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background/Nurse View Placeholder */}
            <div className="absolute inset-0 bg-warmGray-heading flex items-center justify-center">
                <div className="text-center text-white/50 animate-pulse">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <User className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Connecting to Nurse...</h2>
                    <p>Please hold, a nurse will be with you shortly.</p>
                </div>
            </div>

            {/* Header / Timer */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-medium rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        MP
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Clearwater Health</h3>
                        <p className="text-white/80 text-sm">Emergency Line</p>
                    </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                    <span className="text-white font-mono font-bold">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Self View (Picture in Picture) */}
            {isCamOn ? (
                <div className="absolute top-24 right-4 w-32 h-48 bg-black/50 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl z-10">
                    {/* Placeholder for camera feed */}
                    <div className="w-full h-full bg-warmGray-light flex items-center justify-center">
                        <User className="w-8 h-8 text-white/50" />
                    </div>
                </div>
            ) : (
                <div className="absolute top-24 right-4 w-32 h-48 bg-warmGray-body rounded-2xl border-2 border-white/20 flex items-center justify-center shadow-2xl z-10">
                    <VideoOff className="w-8 h-8 text-white/50" />
                </div>
            )}


            {/* Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-5 rounded-full shadow-lg transition-all hover:scale-110 ${isMicOn ? 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30' : 'bg-white text-warmGray-heading'
                        }`}
                >
                    {isMicOn ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
                </button>

                <button
                    onClick={onEndCall}
                    className="p-6 bg-red-500 rounded-full text-white shadow-xl hover:bg-red-600 transition-all hover:scale-110 shadow-red-500/30"
                >
                    <PhoneOff className="w-10 h-10 fill-current" />
                </button>

                <button
                    onClick={() => setIsCamOn(!isCamOn)}
                    className={`p-5 rounded-full shadow-lg transition-all hover:scale-110 ${isCamOn ? 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30' : 'bg-white text-warmGray-heading'
                        }`}
                >
                    {isCamOn ? <Video className="w-8 h-8" /> : <VideoOff className="w-8 h-8" />}
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
    );
}
