var temp = "https://codeforces.com/api/";
var api_url = "https://codeforces.com/api/";
var prob = {};
var probtag = {};
var ACsub = 0;
var unixtime = 0;

function myFunction() {
    var text = document.getElementById("handle_name").value;

    api_url += "user.status?handle=";
    api_url += text;
    
    console.log(api_url)
    getData();
}


async function getData() {
    const response = await fetch(api_url);
    const data = await response.json();

    // console.log(data);
    // console.log(data.result);
    for (var ele of data.result) {
        // console.log(ele);
        // console.log(ele.problem);

        var conid = ele.problem.contestId;
        var con_index = ele.problem.index;

        var problem_id = conid + con_index;
        var unixtime = ele.creationTimeSeconds;

        if (prob[problem_id] === undefined) {   

            prob[problem_id] = {
                problemid: problem_id,
                attempts: 1,
                verdict: ele.verdict
            }

            if (ele.verdict === "OK") ACsub++;
        }
        else {
            prob[problem_id].attempts++;
            if (prob[problem_id].verdict === "OK") continue; //avoiding multiple AC submissions for same problem 

            prob[problem_id].verdict = ele.verdict;
            if (ele.verdict === "OK") ACsub++;

        }

        var tag = ele.problem.tags;

        if (ele.verdict === "OK") {

            var taggss = [];

            for (var i of tag) {
                if (probtag[i] === undefined) {
                    probtag[i] = 1;
                }
                else probtag[i]++;

                taggss.push(i);

            }


            prob[problem_id].taggss = taggss;

            prob[problem_id].subtime = unixtimetoddmmyyy(unixtime);

        }
    }

    console.log(prob);
    console.log(Object.keys(prob).length)
    console.log(ACsub)
    console.log(probtag)

    document.getElementById("myText").innerHTML = JSON.stringify(probtag, null, 4);
    document.getElementById("tot_sub").innerHTML = "<h3>Total Submissions: " + Object.keys(prob).length + "</h3>";
    document.getElementById("ac_sub").innerHTML = "<h3>Accepted Submissions: " + ACsub + "</h3>";

}



function unixtimetoddmmyyy(seconds) {

    var unixtime = seconds * 1000;

    var fulldate = new Date(unixtime); // Date takes input in milliseconds
    var date = fulldate.getDate();
    var month = fulldate.getMonth(); ++month;
    var year = fulldate.getFullYear();
    
    var ddmmyyyy = date + "/" + month + "/" + year;
    // console.log(ddmmyyyy)
    return ddmmyyyy;
}
