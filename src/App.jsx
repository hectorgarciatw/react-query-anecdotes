import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import { NotificationProvider } from "./contexts/NotificationContext";

const App = () => {
    const { data: anecdotes = [], isLoading, isError, addAnecdote, voteAnecdote } = useAnecdotes();

    useEffect(() => {
        if (anecdotes.length === 0) {
            addAnecdote({
                content: "This is a default anecdote",
                votes: 0,
            });
        }
    }, [anecdotes, addAnecdote]);

    const handleVote = (anecdote) => {
        voteAnecdote(anecdote);
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h2>An anecdote service is not available due to problems in the server</h2>
            </div>
        );
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
