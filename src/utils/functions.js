function sortArrayOfObjectsAlphabeticallyAscending(arr, property) {
    return [...arr].sort((a1, a2) =>
        a1[property].localeCompare(a2[property])
    );
}

function sortArrayOfObjectsAlphabeticallyDescending(arr, property) {
    return [...arr].sort((a1, a2) =>
        a2[property].localeCompare(a1[property])
    );
}

function getObjectFromArrayByProperty(arr, property, value) {
    let item = arr.find(a => a[property] === value);
    return item;
}

function flipCheckedItemFromArrayByProperty(arr, property, value) {
    return arr.map(a => {
        if (a[property] === value) {
            return {
                ...a,
                'checked': !a.checked
            };
        }
        return a;
    });
}

function arrayObjectIndexOf(arr, property, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][property] === value) {
            return i;
        }
    }
    return -1;
}

function isPositiveInt(str) {
    return /^[0-9]*$/.test(str);
}

export {
    sortArrayOfObjectsAlphabeticallyAscending,
    sortArrayOfObjectsAlphabeticallyDescending,
    getObjectFromArrayByProperty,
    flipCheckedItemFromArrayByProperty,
    arrayObjectIndexOf,
    isPositiveInt
};
