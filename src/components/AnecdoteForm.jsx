import React from "react";
import { useAnecdotes } from "../hooks/useAnecdotes";

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdotes();

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        if (content.length < 5) {
            alert("Content must be at least 5 characters long");
            return;
        }

        addAnecdote({
            content,
            votes: 0,
        });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
