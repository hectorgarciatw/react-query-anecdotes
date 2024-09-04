import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";

const fetchAnecdotes = async () => {
    const { data } = await axios.get("http://localhost:3001/anecdotes");
    return data;
};

const createAnecdote = async (newAnecdote) => {
    const { data } = await axios.post("http://localhost:3001/anecdotes", newAnecdote);
    return data;
};

const updateAnecdoteVotes = async (anecdote) => {
    const { data } = await axios.patch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1,
    });
    return data;
};

export const useAnecdotes = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useNotification();

    const query = useQuery("anecdotes", fetchAnecdotes, {
        initialData: [],
    });

    const createMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
            setNotification("A new anecdote created!", "info");
        },
    });

    const voteMutation = useMutation(updateAnecdoteVotes, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
            setNotification("Anecdote voted!", "info");
        },
    });

    return {
        ...query,
        addAnecdote: createMutation.mutate,
        voteAnecdote: voteMutation.mutate,
    };
};
