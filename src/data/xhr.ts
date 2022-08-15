
export class XhrPool {
    private xhr: any[] = [];

    public push(ajaxCall: JQueryXHR | any) {
        if (!this.xhr) {
            this.xhr = [];
        }
        this.xhr.push(ajaxCall);
    }

    public pushXhr<T extends JQueryXHR | any>(ajaxCall: T): T {

        this.push(ajaxCall);

        return ajaxCall;
    }

    public abortAll() {
        if (this.xhr && this.xhr.length > 0) {
            this.xhr.forEach((jqXhr) => {
                if (jqXhr != null && jqXhr.abort) {
                    jqXhr.abort();
                }
            });
            this.xhr = null as any;
        }
    }
}