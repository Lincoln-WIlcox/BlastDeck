import { Howl } from "howler"

export const playSoundFromURL = async (url) =>
{
    const sound = new Howl({
        src: url,
        html5: true,
    })
    sound.play()
}