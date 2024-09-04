import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchAnecdotes = async () => {
    const { data } = await axios.get("http://localhost:3001/anecdotes");
    return data;
};

const createAnecdote = async (newAnecdote) => {
    const { data } = await axios.post("http://localhost:3001/anecdotes", newAnecdote);
    return data;
};

const updateAnecdoteVotes = async (anecdote) => {
    const { data } = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1,
    });
    return data;
};

export const useAnecdotes = () => {
    const queryClient = useQueryClient();

    const query = useQuery("anecdotes", fetchAnecdotes, {
        initialData: [], // Inicializa con una lista vacía
    });

    const createMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
        },
    });

    const updateMutation = useMutation(updateAnecdoteVotes, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
        },
    });

    return {
        ...query,
        addAnecdote: createMutation.mutate,
        voteAnecdote: updateMutation.mutate,
    };
};
