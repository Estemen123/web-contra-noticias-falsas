import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

type ResultProps ={
    content : string,
    title: string,
    scores: number,
    urls: string| null,
}
const Result = ({content,title,scores,urls}:ResultProps) => {

    return (
        <div className="grid">
            <Record/>
            <Card>
                <CardHeader>
                    <CardTitle>Titulo de noticia falsa</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>{content}</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
};

const Record = ()=>{

    return(
        <div>
            <span className="text-5xl text-red-600">ES Falso</span>
        </div>
    );
};
export { Result };
