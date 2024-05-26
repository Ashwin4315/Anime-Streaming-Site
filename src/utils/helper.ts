export function converter(url: string): string {
    let Arr = url.split("/");
    let lenght = Arr.length
    let anime = Arr[lenght - 1];

    return anime
}


 export function searchConverter(url: string): string {

    const str = url.replace(/[^a-zA-Z0-9]/g, ' ')
    const isepisode = (element) => element ==="episode";
    let Arr = str.split(" ");
    let slicer= Arr.findIndex(isepisode)
    if(slicer !== -1){
        Arr=Arr.slice(0,slicer)
    }


     
    let conStr: string;
    if (Arr[1] === undefined) {
        conStr = Arr[0]
    }
    else {
        conStr = Arr[0] + " " + Arr[1]
    }
   
    return conStr
}


export const generateNumbersInRange=(range: string): number[] =>{
    const [startStr, endStr] = range.split('-');
    const start = parseInt(startStr);
    const end = parseInt(endStr);
    const numbers: number[] = [];

    for (let i = start; i <= end; i++) {
        numbers.push(i);
    }

    return numbers;
}

export const splitEpisodes =(episode: number): string[] =>{
    const ranges: string[] = [];
    let start: number = 1;
    let end: number = 100;

    while (start < episode) {
        if (end >= episode) {
            ranges.push(`${start}-${episode}`);
        } else {
            ranges.push(`${start}-${end}`);
        }
        start += 100;
        end += 100;
    }

    return ranges;
}




export const StringConvertFunction = (str: string, limit: number): string => {

    let word
    if (str.length > limit) {
        word = str.slice(0, limit) + "...";
    }
    else {
        word = str
    }
    return word

}


