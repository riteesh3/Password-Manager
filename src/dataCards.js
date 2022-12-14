import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const DataCards = () => {

    const [ reponame, setReponame ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ repos,setRepos ] = useState([]);
    const [ errorMessage, setErrorMessage] = useState("");
    const myarr = reponame.split("/");

    function handleSubmit(e){
        e.preventDefault();
        searchRepos();
    };
    
    function searchRepos(currentPage){
        setLoading(true);
        var getissuesurl;
        getissuesurl = 'https://api.github.com/repos/'+reponame+'/issues?page='+currentPage+'&per_page=10';
    
        axios.get(getissuesurl).then(res=>{
          setLoading(false);
          setRepos(res.data);
        }).catch(function (error) {
        if (error.response) {
          const status = error.response.status;
          if(status === 404){
            setLoading(false);
            var messgae = "Invalid Repo, It doesn't exist ! Please recheck the Repo/Issue Name.";
            setErrorMessage(messgae);
          }
        }
      });
    }

    function renderRepo(repo){
        return(
          <div className="row issue-preview" key={repo.number}>
                <Link to={`/IssueDetails/${myarr[0]}/${myarr[1]}/${repo.number}`} target="_blank">
                    <h6 className="repo-name">
                        Issue : {repo.number}
                    </h6>
                </Link>
          </div>
        );
      }

    const handlePageClick = (data) => {
        var pgno = data.selected +1;
        searchRepos(pgno);
    }
    
    return ( 
        <div className="home">
            <div className="page">
                <div className="form-container">
                        <form className="form">
                            <input type="text" class="input" 
                                value = {reponame}
                                placeholder="eg:username/repo"
                                onChange={e => {setErrorMessage(""); 
                                    setReponame(e.target.value)}}>
                            </input>
                            <button type="submit" class="fetch-button" 
                                onClick={handleSubmit}>
                                {loading? "Fetching...": "Fetch"}
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                          )
                        }
                        <div className="results-container">
                            {repos.map(renderRepo)}
                        </div>

                    </div>
                </div>
                <div className="pagenation-container" id="footer">
                    <ReactPaginate 
                        previousLabel={'previous'} nextLabel={'next'}
                        breakLabel={'...'} pageCount={50} marginPagesDisplayed={5}
                        pageRangeDisplayed={5}  onPageChange={handlePageClick}
                        containerClassName={"pagination paginate-class justify-content-center"} 
                        pageClassName={"page-item"}  pageLinkClassName={"page-link"} 
                        previousClassName={"page-item"} previousLinkClassName={"page-link"} 
                        nextClassName={"page-item"} nextLinkClassName={"page-link"} 
                        breakClassName={"page-item"} breakLinkClassName={"page-link"} 
                        activeClassName={"active"} />
                </div>
        </div>
     );
}
 
export default DataCards;