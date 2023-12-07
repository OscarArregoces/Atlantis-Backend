export const getCurrentDate = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const date = `${day}/${month}/${now.getFullYear()}`;

    const hourFormat = hour < 12 ? "AM" : "PM";
    const hourStr = hour < 10 ? "0" + hour : hour;
    const minuteStr = minute < 10 ? "0" + minute : minute;

    const time = `${hourStr}:${minuteStr} ${hourFormat}`;

    return `${date} - ${time}`;
}
