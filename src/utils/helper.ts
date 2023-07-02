export function converter(url: string): string {
    let Arr = url.split("/");
    let lenght = Arr.length
    let anime = Arr[lenght - 1];
    const cconStr = anime.replace(/_-_/, "-")
    const conStr = cconStr.replace(/____|___|__|_/g, "-").toLowerCase();
    return conStr
}

 export function searchConverter(url: string): string {

    const str = url.replace(/[^a-zA-Z0-9]/g, ' ')
    let Arr = str.split(" ");

    let conStr: string;
    if (Arr[1] === undefined) {
        conStr = Arr[0]
    }
    else {
        conStr = Arr[0] + " " + Arr[1]
    }
   
    return conStr
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


export function isStreamsb(value) {
    if(value.name==="Streamsb")
    return value;
  }