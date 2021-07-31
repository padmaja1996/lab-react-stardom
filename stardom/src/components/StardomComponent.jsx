/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import prostar from '../resources/prostars.json';
import './StardomComponent.css';

export default class StardomComponent extends Component {
    constructor(){
        super();
        this.state ={
            //list of prostars
            prostarList:[
                prostar[0],prostar[1],prostar[2],prostar[3],prostar[4]
            ],
            //index of prostars in the initial list for adding non-repeated prostars
            noOfStarsList:[
                0,1,2,3,4
            ],

            sortedNameWise:false,
            sortedPopularityWise:false
        };
    }

    deleteProStar(index){

        //remove the clicked prostar
        let filteredArray = this.state.prostarList;
        filteredArray.splice(index,1);
        let filteredIndex = this.state.noOfStarsList;
        filteredIndex.splice(index,1);
        this.setState({
            prostarList: filteredArray,
            noOfStarsList :filteredIndex
        });
        
    }

    //rendering all prostars in the list
    renderProStars =() =>{
         const starsList=this.state.prostarList;
         const stars=starsList.map((star,index)=>{         
            return  <tr key={star.id}>
                        <td><img src={star.pictureUrl} alt="picture"/></td>
                        <td>{star.name}</td>
                        <td>{star.popularity}</td>
                        <td><button onClick={()=>this.deleteProStar(index)}>Delete</button></td>
                    </tr>;
        });
        return stars;
    }

    addProStar= ()=>{
        //generating random prostars
        var randomProStar=Math.floor(Math.random()*prostar.length);
        while(this.state.noOfStarsList.includes(randomProStar))
            randomProStar=Math.floor(Math.random()*prostar.length);

        //adding prostars to list
        this.setState({
            noOfStarsList:this.state.noOfStarsList.concat(randomProStar),
            prostarList:this.state.prostarList.concat(prostar[randomProStar])
        });
    }

    sortByName =() =>{

        //sort prostars by name
       var sortedStars= this.state.prostarList.sort((star1,star2)=>{
           var name1=star1.name.toLowerCase(),name2=star2.name.toLowerCase();
           if(name1>name2)
            return 1;
           else if(name1<name2)
            return -1;
           return 0;
       });
       //set state as sortedByName
       this.setState({
           sortedNameWise:true
       });
       return sortedStars;
    }

    sortByPopularity =() =>{

        //sort prostars by Popularity
        var sortedPopularity= this.state.prostarList.sort((star1,star2)=>{
            if(star1.popularity>star2.popularity)
             return -1;
            else if(star1.popularity<star2.popularity)
             return 1;
            return 0;
        });

        //set state as sortedByPopularity
        this.setState({
            sortedPopularityWise:true
        });
        return sortedPopularity;
     }


    render() {
        return (
            <div className='header-container'>
                <h1>ProStars</h1>
                <button onClick={this.addProStar}>Get Random Contact</button>
                <button onClick={this.sortByName} className='black-button'>Sort By Name</button>
                <button onClick={this.sortByPopularity}>Sort By Popularity</button>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>popularity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProStars()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}