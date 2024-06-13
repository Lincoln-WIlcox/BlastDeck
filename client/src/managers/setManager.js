export const getSets = () =>
{
    return fetch('/api/set').then(res => res.json())
}

export const getSetById = (id) =>
{
    return fetch(`/api/set/${id}`).then(res => res.json())
}

export const removeCardFromSet = (setId, userCardId) =>
{
    return fetch(`/api/set/${id}/remove-card?userCardId=${userCardId}`,
        {
            method: "DELETE",
        })
}