export const getSets = () =>
{
    return fetch('/api/set').then(res => res.json())
}