// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt


frappe.query_reports["Student Monthly Attendance Sheet"] = {
    "filters": [{
            "fieldname": "month",
            "label": __("Month"),
            "fieldtype": "Select",
            "options": "Jan\nFeb\nMar\nApr\nMay\nJun\nJul\nAug\nSep\nOct\nNov\nDec",
            "default": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
                "Dec"
            ][frappe.datetime.str_to_obj(frappe.datetime.get_today()).getMonth()],
        },
        {
            "fieldname": "year",
            "label": __("Year"),
            "fieldtype": "Select",
            "reqd": 1
        },
        {
            "fieldname": "student_batch",
            "label": __("Student Batch"),
            "fieldtype": "Link",
            "options": "Student Batch",
            "reqd": 1
        }
    ],

    "onload": function() {
        return frappe.call({
            method: "erpnext.schools.report.student_monthly_attendance_sheet.student_monthly_attendance_sheet.get_attendance_years",
            callback: function(r) {
                var year_filter = frappe.query_report_filters_by_name.year;
                year_filter.df.options = r.message;
                year_filter.df.default = r.message.split("\n")[0];
                year_filter.refresh();
                year_filter.set_input(year_filter.df.default);
            }
        });
    }
}