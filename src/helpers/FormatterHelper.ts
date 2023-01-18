export class FormatterHelper {
    public static time(text: any): string {
        var h_part = "";
        var m_part = "";
        var s_part = "";
        if (text > 9*3600)
            return "> 9 h";
        if (text < 120)
            return text.toFixed(0) + " s";
        
        if (text >= 3600)
            h_part = (text / 3600).toFixed(0);
        if (text >= 60) 
            m_part = ((text % 3600) / 60).toFixed(0);
        s_part = (text % 60).toFixed(0);
        return h_part.padStart(2, '0') + ":" + m_part.padStart(2, '0') + ":" + s_part.padStart(2, '0');
    }
}