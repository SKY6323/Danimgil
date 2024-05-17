// getLineClass.js
import styles from'./ListDetail.module.css'
const getLineClass = (lineNumber) => {
    switch (lineNumber) {
        case "01호선":
            return styles.line1;
        case "02호선":
            return styles.line2;
        case "03호선":
            return styles.line3;
        case "04호선":
            return styles.line4;
        case "05호선":
            return styles.line5;
        case "06호선":
            return styles.line6;
        case "07호선":
            return styles.line7;
        case "08호선":
            return styles.line8;
        case "09호선":
            return styles.line9;
        case "GTX-A":
            return styles.gtxa;
        case "경강선":
            return styles.gyeonggang;
        case "경의선":
            return styles.gyeongui;
        case "경춘선":
            return styles.gyeongchun;
        case "공항철도":
            return styles.airport;
        case "김포도시철도":
            return styles.gimpo;
        case "서해선":
            return styles.seohaeline;
        case "수인분당선":
            return styles.suinbundang;
        case "신림선":
            return styles.sinrim;
        case "신분당선":
            return styles.sinbundang;
        case "용인경전철":
            return styles.yongin;
        case "우이신설경전철":
            return styles.ui;
        case "의정부경전철":
            return styles.uijeongbu;
        case "인천2호선":
            return styles.incheon2;
        case "인천선":
            return styles.incheon;
        default:
            return styles.defaultLine;
    }
};

export default getLineClass;
