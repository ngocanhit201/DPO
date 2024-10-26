
interface OrderProcedure {
    id: number;
    idProcedure: number;
    order: number;
    idDepartment: number;
    idDepartmentNavigation: Department;
    idProcedureNavigation: number | null;
}


interface Procedure {
    id: number;
    name: string;
    description: string | null;
    fee: number;
    level: number;
    code: string;
    cases: any[];
    orderProcedures: OrderProcedure[];
    idPapers: Paper[];
}
interface ResultFrom {
    id: number;
    name: string;
    code: string;
}
interface Case {
    idCaseProgress: string;
    idAccount: number;
    idProcedure: number;
    id: number;
    dateDone: Date;
    dateCreate: Date;
    comment: string;
    idResultForm: number;
    require: string;
    files: Files[];
}

interface CaseProgressDetail {
    id: number;
    idStatus: number;
    idCase: number;
    idCaseNavigation: string;
    idStatusNavigation: StatusNavigation;
}

interface StatusNavigation {
    id: number;
    name: string;
    code: string;
    caseProgresses: string[];
}

interface Account {
    username: string;
    idDepartment: number;
    id: number;
    password: string;
    role: string;
    idStudent: number;
    cases: string[];
    idDepartmentNavigation: Department,
    idStudentNavigation: Student

}

interface Department {
    id: number;
    name: string;
    email: string | null;
    code: string;

}

type Student = {
    id: number;
    name: string;
    birthday: string;
    msv: string;
    class: string;
    hometown: string;
    major: string;
    sdt: string | null;
    email: string | null;
    isMale: boolean;
    accounts: Account;
};
interface ProcedureNavigation {
    id: number;
    name: string;
    description: string;
    fee: number;
    level: number;
    code: string;
    cases: string[];
}

interface OrderProcedure {
    id: number;
    idProcedure: number;
    order: number;
    idDepartment: number;
    Department: string;
}

interface Paper {
    id: number;
    name: string;
    code: string;
    Procedure: Procedure;
}

interface ResultFormNavigation {
    id: number;
    name: string;
    code: string;
    cases: string[];
}

interface Files {
    id: number;
    name: string;
    url: string;
    idCases: string[];
}
interface AllCassInOne {
    case: Case,
    procedure: Procedure,
    student: Student,
}
