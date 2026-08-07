import React from "react"


function Dashboard() {
    return (
        <div>
            <div className='container-fluid'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div className='row'>
                        <div className='col-3' style={{ minHeight: "200px", background: "orangered", margin: "4%", padding:'2%'}}>
                            <span className='fa fa-home' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Dashboard</span>
                        </div>
                        <div className='col-3' style={{ minHeight: "200px", background: "pink", margin: "4%", padding:'2%' }}>
                            <span className='fa fa-phone' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Contact_Mgmt</span>
                        </div>
                        <div className='col-3' style={{ minHeight: "200px", background: "green", margin: "4%", padding:'2%' }}>
                            <span className='fa fa-edit' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Add_Notes</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3' style={{ minHeight: "200px", background: "blue", margin: "4%", padding:'2%' }}>
                            <span className='fa fa-pencil' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Add_Course</span>
                        </div>
                        <div className='col-3' style={{ minHeight: "200px", background: "teal", margin: "4%", padding:'2%' }}>
                            <span className='fa fa-lock' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Change_Password</span>
                        </div>
                        <div className='col-3' style={{ minHeight: "200px", background: "purple", margin: "4%", padding:'2%' }}>
                            <span className='fa fa-sign-out' style={{fontSize:"100px", color:"white", lineHeight:'2'}}></span><br/>
                            <span style={{fontSize:'25px', color:'white'}}>Logout</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Dashboard