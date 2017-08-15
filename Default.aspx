<%@ Page Title="Login Page for curators" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 <style>
     body {
         background-color: dimgrey;
     }
     div.jumbotron{background-color:white;}
     div.container{
         background-color:white;
     }
     
 </style>  
    <div class="jumbotron">
        <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: large;">"SOAS Insights: Exhibition Engagement App</h1>
        <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: medium;" class="text-left">Curators' Interface</h2>
    </div>
    #qt {margin-right:30px;}
     <div class="container">
    <form class="form-signin">
       
        <h1 style="color: #FFCC00; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Login Page</h1>
        <label for="inputUserName" class="sr-only">User Name:</label>
        <input type="text" id="inputUserName" class="form-control" placeholder="User Name" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
         <label> <input type="checkbox" value="remember-me"> Remember me</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Enter</button>
        <button class="btn btn-lg btn-primary btn-block" type="reset">Reset</button>
      </form>

    </div> <!-- /container -->


    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
 </asp:Content>
 

  


