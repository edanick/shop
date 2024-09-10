
let key: number = 0;

const generateKey = () => {
    key++;
    return `${new Date().getTime()}${key}`;
}

export default generateKey;