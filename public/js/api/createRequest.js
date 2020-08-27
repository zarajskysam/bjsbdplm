/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let resultXhr;
    let resultError;
    if (options.method === 'GET') {
        const xhr = new XMLHttpRequest();
        xhr.open( 'GET', options.url + '?mail=' + options.data.mail + '&password=' + options.data.password );
        xhr.withCredentials = true;
        try {
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200){  
                    resultXhr = xhr;
                    resultError = null; 
                    xhr.callback = (resultXhr, resultError)=>{ 
                        console.log(resultError);
                        console.log(resultXhr);
                    }
                    console.log(resultXhr);
                    return resultXhr;
                }
            }
        }
        catch(err) {
            resultError = err;
            resultXhr = null;
            options.callback = (resultXhr, resultError)=>{
                console.log(resultError);
            };
        }
    } else {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append( 'mail', options.data.mail );
        formData.append( 'password', options.data.password );

        xhr.open( options.method , options.url);
        xhr.withCredentials = true;
        try {
            xhr.send( formData );
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200){
                    resultXhr = xhr;
                    resultError = null;
                    xhr.callback = (resultXhr, resultError)=>{
                        console.log(resultError);
                        console.log(resultXhr);
                    }
                    console.log(resultXhr);
                    return resultXhr;
                }

            }
        } catch (err) {
            resultError = err;
            resultXhr = null;
            xhr.callback = (resultXhr, resultError)=>{
                console.log(resultError);
            };
        }
       
    }
    
}

