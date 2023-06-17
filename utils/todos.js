function truncateString(str) {
  if (str.length <= 50) {
    return str;
  } else {
    return str.substring(0, 45) + '...';
  }
}

function getCurrentTime() {
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString();
  return formattedTime;
}

function hasError(objects) {
  return objects.some((obj) => 'error' in obj);
}

function orderTodos(todosArray) {
  if (hasError(todosArray)) {
    return;
  }

  const newArray = todosArray.slice();

  newArray.sort((a, b) => {
    const isAPlaceholder = a.id === 'placeholder';
    const isBPlaceholder = b.id === 'placeholder';

    if (isAPlaceholder && !isBPlaceholder) {
      return 1;
    }

    if (!isAPlaceholder && isBPlaceholder) {
      return -1;
    }

    if (isAPlaceholder && isBPlaceholder) {
      return 0;
    }

    const timeA = new Date(a.fields.timecreated);
    const timeB = new Date(b.fields.timecreated);
    return timeA - timeB;
  });

  return newArray;
}

export { truncateString, orderTodos, getCurrentTime };
