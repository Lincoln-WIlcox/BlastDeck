export const getSets = () =>
{
    return fetch('/api/set').then(res => res.json())
}

export const getSetById = (id) =>
{
    return fetch(`/api/set/${id}`).then(res => res.json())
}

export const removeCardFromSet = (setId, cardId) =>
{
    return fetch(`/api/set/${setId}/remove-card?cardId=${cardId}`,
        {
            method: "DELETE",
        })
}