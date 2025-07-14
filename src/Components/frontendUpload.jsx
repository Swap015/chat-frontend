
// client/src/App.jsx
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io("https://chat-backend-gyjs.onrender.com");

function App() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const chatEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (!username || !message) return;

        const newMessage = {
            username,
            message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        socket.emit("send_message", newMessage);
        setMessage('');
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    useEffect(() => {
        // Scroll to bottom when a new message arrives
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 to-pink-200 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">💬 Real-Time Chat</h1>

                <form onSubmit={handleSend} className="space-y-3 mb-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    />
                    <button type="submit" className="w-full bg-blue-500  py-2 rounded hover:bg-blue-600 text-black">
                        Send 🚀
                    </button>
                </form>

                <div className="max-h-80 overflow-y-auto border p-3 rounded bg-gray-50 text-black">
                    {chat.map((msg, i) => (
                        <div
                            key={i}
                            className={`mb-2 flex flex-col ${msg.username === username ? 'items-end' : 'items-start'}`}
                        >
                            <div className={`px-3 text-black py-2 rounded-lg shadow-sm max-w-xs ${msg.username === username ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}>
                                <p className="text-sm text-gray-800 font-semibold">{msg.username}</p>
                                <p className="text-base text-black">{msg.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef}></div>
                </div>
            </div>
        </div>
    );
}

export default App;
