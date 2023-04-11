export class FormatterHelper {
    public static time(text: any): string {
        var h_part = "";
        var m_part = "";
        var s_part = "";
        if (text > 9*3600)
            return "> 9 h";
        if (text < 120)
            return Math.floor(text) + " s";
        
        if (text >= 3600)
            h_part = Math.floor(text / 3600).toString();
        if (text >= 60) 
            m_part = Math.floor((text % 3600) / 60).toString();
        s_part = Math.floor(text % 60).toString();
        return h_part.padStart(2, '0') + ":" + m_part.padStart(2, '0') + ":" + s_part.padStart(2, '0');
    }

    public static decimalToPercentage(dec: any): string {
        return (dec * 100).toFixed(1);
    }

    public static heaterState(state: any): string {
        return state + " - " + FormatterHelper.getStaticDescription(state);
    }

    private static getStaticDescription(state: any): string {
        switch (state) {
            case 2:
                return "Praca";
            case 17:
                return "Nieudane rozpalanie";
            case 31:
                return "Rozpalanie";
            case 33:
                return "Czuwanie";
            case 37:
                return "Oczyszczanie rusztu";
            case 58:
                return "Wygaszanie";
            default:
                return "";
        }
    }
}