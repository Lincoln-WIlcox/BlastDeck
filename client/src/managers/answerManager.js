export const answerCard = (cardId, answerId) =>
{
    return fetch(`/api/answer`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardId, answerId)
        }).then(res => res.json())
}