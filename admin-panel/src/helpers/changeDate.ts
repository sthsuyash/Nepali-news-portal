export const changeDate = (date: string, hm: boolean = false) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    if (hm) {
        options.hour = "numeric";
        options.minute = "numeric";
    }

    return new Date(date).toLocaleString("en-US", options);
}
