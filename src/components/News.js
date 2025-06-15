import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes, { string } from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
 
 static defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
};

static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};
 

     constructor( props)
  {
    super(props);
    console.log("hello i am constructor from news components");
    this.state={
              articles:[],
              loading:true,
              page:1,
              totalResults:0
    }
    document.title=`${this.props.category}-NewsMonkey`;
  }

  async updatenews(pageno){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apikey=60dab37902cd4842bd968c562f406507&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
     this.props.setProgress(30);
    let parseddata=await data.json()
       this.props.setProgress(70);
    console.log(parseddata);
    this.setState({articles:parseddata.articles,totalArticles:parseddata.totalResults, loading:false});

    this.props.setProgress(100);
  }


 async componentDidMount(){
  //  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apikey=60dab37902cd4842bd968c562f406507&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data= await fetch(url);
  //   let parseddata=await data.json()
  //   console.log(parseddata);
  //   this.setState({articles:parseddata.articles,totalArticles:parseddata.totalResults, loading:false});
    this.updatenews();
  }


   handlePrevclick= async()=>
  {
    // console.log("pre");
   
    //   let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apikey=60dab37902cd4842bd968c562f406507&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //    this.setState({loading:true});
    //   let data= await fetch(url);
    // let parseddata=await data.json()
    // console.log(parseddata);
    
    //  this.setState({
    //   page:this.state.page-1,
    //   articles:parseddata.articles,
    //   loading:false
    // });
    this.setState({page:this.state.page-1})
   this. updatenews()
  }


  handleNextclick= async()=>
  {
  //    console.log("nxt");
  //    if(!(this.state.page+1 > Math.ceil(this.state.totalArticles/20)))
  //    {
         
  
  //     let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apikey=60dab37902cd4842bd968c562f406507&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //       this.setState({loading:true});
  //     let data= await fetch(url);
  //   let parseddata=await data.json()

    
  //    this.setState({
  //     page:this.state.page +1,
  //     articles:parseddata.articles,
  //      loading:false
  //    });
  // }
      this.setState({page:this.state.page+1})
       this.updatenews()

   }

   fetchMoreData = async () => {
   this.setState({page:this.state.page+1});
   
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apikey=60dab37902cd4842bd968c562f406507&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data= await fetch(url);
    let parseddata=await data.json()
    console.log(parseddata);
    this.setState({articles:this.state.articles.concat(parseddata.articles),totalArticles:parseddata.totalResults});

  };


  render() {
    console.log("render")
    return (
      <>
      <h1 className='text-center' style={{margin:'35px 0px',marginTop:"90px"}}>NewsMonkey-Top  {this.props.category} Headlines </h1>
        
   { this.state.loading&&<Spinner/>}  

         <InfiniteScroll
          dataLength={this.state. articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>} >

    <div className='container'>

        <div className='row'>
           {this.state.articles.map((element)=>
        {
          return <div className='col-md-4' key={element.url}>
           <NewsItem
          title={element.title?element.title:"" }
          description={element.description?element.description:"" }
          imageurl={element.urlToImage}
          newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> </div>
        })}
        </div>
      </div>
      </InfiniteScroll>

      
       </>
    )
  }
}

export default News
