export default function Image({ src, alt = "", className = "", width, height, fill = false, onError, style = {}, ...rest }) {
    const isExternal = typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"));
    // fallback
    const finalSrc = src || "/placeholder.svg";

    if (fill) {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%", ...style }} className={className}>
                <img
                    src={finalSrc}
                    alt={alt}
                    onError={onError}
                    {...rest}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
        );
    }

    const imgStyle = { width: width ? width : "auto", height: height ? height : "auto", objectFit: "cover", ...style };

    return <img src={finalSrc} alt={alt} onError={onError} className={className} style={imgStyle} {...rest} />;
}