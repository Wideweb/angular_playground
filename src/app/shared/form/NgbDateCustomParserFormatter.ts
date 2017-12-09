import { NgbDateStruct, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {

    constructor(private dateFormat: string) {
        super();
    };

    format(date: NgbDateStruct): string {
        if (date === null) {
            return '';
        }
        let d = new Date(date.year, date.month - 1, date.day);
        return d.toISOString();
    }

    parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }

        let d = new Date(value);
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDay()
        };
    }
}