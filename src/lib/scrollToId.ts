export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80; // adjust based on header height
    const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
        top: y,
        behavior: "smooth",
    });
}
