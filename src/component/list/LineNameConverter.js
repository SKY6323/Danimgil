const convertLineNameToClassName = (lineName) => {
    switch (lineName) {
        case "01호선":
            return "line1";
        case "02호선":
            return "line2";
        case "03호선":
            return "line3";
        case "04호선":
            return "line4";
        case "05호선":
            return "line5";
        case "06호선":
            return "line6";
        case "07호선":
            return "line7";
        case "08호선":
            return "line8";
        case "09호선":
            return "line9";
        case "GTX-A":
            return "gtxa";
        case "경강선":
            return "gyeonggang";
        case "경의선":
            return "gyeongui";
        case "경춘선":
            return "gyeongchun";
        case "공항철도":
            return "airport";
        case "김포도시철도":
            return "gimpo";
        case "서해선":
            return "seohaeline";
        case "수인분당선":
            return "suinbundang";
        case "신림선":
            return "sinrim";
        case "신분당선":
            return "sinbundang";
        case "용인경전철":
            return "yongin";
        case "우이신설경전철":
            return "ui";
        case "의정부경전철":
            return "uijeongbu";
        case "인천2호선":
            return "incheon2";
        case "인천선":
            return "incheon";
        // 추가적인 노선들에 대한 처리 추가
        default:
            return "";
    }
}

export default convertLineNameToClassName;
