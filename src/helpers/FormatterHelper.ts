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
}