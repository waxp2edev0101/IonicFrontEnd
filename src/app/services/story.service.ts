import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
    constructor(private http: HttpClient) 
    {}

    // Gets default control blocks
    getControlBlocks(defaultProfile = "")    
    {
        if (defaultProfile == "")
            return this.http.get<any>(`${environment.apiUrl}/carousel`);

        let params = new HttpParams()
        .set('profile', defaultProfile)
        console.log('get control blocks param', params)
        return this.http.get<any>(`${environment.apiUrl}/carousel`, {params: params});        
    }

    // Posts control blocks, returns data blocks
    postControlBlocks(controlBlocks)
    {
        /*
        controlBlocks.controlBlocks.forEach(element => {
            this.setControlParam(element, "mindate", this.mindate.toISOString());
            this.setControlParam(element, "maxdate", this.maxdate.toISOString());                
        });
        */
       console.log('control blocks', controlBlocks)
        return this.http.post<any>(`${environment.apiUrl}/carousel`, controlBlocks);
    }

    // Get blank control blocks
    getControlBlockTemplate(blockName: string)
    {
        let params = new HttpParams()
        .set('blockname', blockName)
        return this.http.get<any>(`${environment.apiUrl}/carousel`, {params: params});
    }

    getArticle(id)
    {
        // This is deprecated
        const params = new HttpParams()
        .set('id', id);
        return this.http.get<any>(`${environment.apiUrl}/query/article`, {params: params});
    }

    getCategories()
    {
        return this.http.get<any>(`${environment.apiUrl}/category`);
    }

    setCollectionCategory(collection, id, category)
    {

        //return this.http.put<any>(`${environment.apiUrl}/category`, {params: params})
        return this.http.put<any>(`${environment.apiUrl}/category/${collection}?id=${id}&category=${category}`, '');
    }

    setControlParam(controlBlock, blockName, blockValue)
    {
        controlBlock.parameters.forEach(element => {
            if (element.name == blockName)
                element.currentvalue = blockValue
        });
    }
    /*
    moveDates(moveDays)
    {
        this.mindate.setDate(this.mindate.getDate() + moveDays);
        this.maxdate.setDate(this.maxdate.getDate() + moveDays);
    }
    */
}  
