function getRandomNum(min, max) {
    const num = Math.random() * (max - min + 1) + min;
    return Math.floor(num)
}



export default getRandomNum