export const getSets = () =>
{
    return fetch('/api/set').then(res => res.json())
}

export const getSetById = (id) =>
{
    return fetch(`/api/set/${id}`).then(res => res.json())
}