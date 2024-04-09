# googleCalendarCrud
Simple fullstack app for crud actions over google calendar
Node, React, Typescript, PostgreSql

<b>BACKEND</b>
<ul>
  <li>Node Express server</li>
  <li>Googleapis module</li>
  <li>
    Controllers
    <ul>
      <li>googleOAuth controller - google oauth2 login endpoints</li>
      <li>calendar controller - event fetching, creation, update & deletion endpoints</li>
    </ul>
  </li>
  <li>
    Services
    <ul>
      <li>authorization service - verifies jwt recieved from google </li>
      <li>calendar service - google calendar interactions </li>
      <li>database service - adding action logs to database </li>
    </ul>
  </li>
  <li> Middleware
    <ul>
      <li>auth middleware - authorizes user using token from request header</li>
    </ul>
  </li>
</ul>

<b>FRONTEND</b>
<ul>
  <li>React app</li>
  <li>Components
    <ul>
      <li>Events - event listing, creation, editing</li>
      <li>Login - login using google account</li>
      <li>NavBar - app navigation</li>
    </ul>
  <li>Contexts
    <ul>
      <li>Auth context - stores if user is loggedIn & authorization token</li>
    </ul>
  </li>
  <li>Custom hooks
    <ul>
      <li>useCalendar hook - stores functions used in events components</li>
    </ul>
  </li>
  </li>
  <li>React router</li>
  <li>UI<br/>
  ![events](https://github.com/EdiSincek/googleCalendarCrud/assets/87430076/caa93660-84a3-4b4c-aa64-13ac635ae22c)<br/>
  ![newEvent](https://github.com/EdiSincek/googleCalendarCrud/assets/87430076/ebcf8275-df0b-4ea9-aa97-012788b8296a)<br/>
  ![editEvent](https://github.com/EdiSincek/googleCalendarCrud/assets/87430076/39b3e1b9-fe49-4ba9-8874-45d4280c2378)<br/>
  </li>
</ul>

<b>DATABASE</b>
<ul>
  <li>PostgreSql db</li>
  <li>action_logs table - stores actions performed on events</li>
</ul>
![db](https://github.com/EdiSincek/googleCalendarCrud/assets/87430076/6af3260a-b954-4637-9e15-612371d7ca02)

<b>POTENTIAL IMPROVEMENTS</b>
<ul>
  <li>Handling multiple concurrent users
    <ul>
      <li>Storing user data and access and refresh tokens to database</li>
      </li>Setting access token of correct user on each request to google to eliminate data fetching from other accounts</li>
    </ul>
  </li>
  <li>Handling token expiration
    <ul>
      <li>Checking if token is expired</li>
      <li>Refreshing access token using refresh token</li>
    </ul>
  </li>
  <li>Frontend improvements
    <ul>
      <li>Showing logs to the user.</li>
      <li>Caching events</li>
      <li>UI/UX improvements</li>
    </ul>
  </li>
  <li>Better error handling</li>
</ul>
