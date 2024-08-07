export const answerCard = (cardId, answer) =>
{
    return fetch(`/api/answer/passive`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardId, answer })
        }).then(res => res.json())
}

export const answerActive = (cardId, answer) =>
{
    return fetch(`/api/answer/active`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardId, answer })
        }).then(res => res.json())
}