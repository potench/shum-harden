<?  error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);#E_ALL);
    ini_set('display_errors',1);
    session_start();

    $CODE = "StopTryingToBeClever";

    $vals = $_POST;
    $result = array();

     $_SESSION['attempts'] = 0;

    if (isset($_GET['reset'])) {
      $_SESSION['attempts'] = 0;  
    }
    
    if (!isset($_SESSION['attempts'])) {
      $_SESSION['attempts'] = 0;
    }

    $_SESSION['attempts'] += 1;

    if ($_SESSION['attempts'] >= 10) {
      $result['result'] = -3;
      $result['error'] = array('message' => "For reals get lost you're not invited!");
    } else if ($vals['code'] == $CODE) {

      // load Zend Gdata libraries
      require_once 'Zend/Loader.php';
      Zend_Loader::loadClass('Zend_Gdata_Spreadsheets');
      Zend_Loader::loadClass('Zend_Gdata_ClientLogin');

      // set credentials for ClientLogin authentication
      $user = "Man....IseeYouTryingToHackMe";
      $pass = "YouWantAJob? Email me at christian.harden@ff0000.com";


      try {
        // connect to API
        $service = Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME;
        $client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $service);
        $service = new Zend_Gdata_Spreadsheets($client);

        // set target spreadsheet and worksheet
        $ssKey = 'EatShitAndDie!';
        $wsKey = '1';

        // create row content
        date_default_timezone_set('America/Los_Angeles');

        $row = array(
          "timestamp" => date("m/d/y H:m:s"),
          "code" => $vals['code'], 
          "name" => $vals['name'], 
          "guest" => $vals['guest'], 
          "attending" => $vals['attending'],
          "message" => $vals['message'],
          "shareable" => $vals['shareable']
        );

        // insert new row
        $entryResult = $service->insertRow($row, $ssKey, $wsKey);

        $result['result'] = 1;
        $result['success'] = array('id' => $entryResult->id);
        
      } catch (Exception $e) {
        $result['result'] = -2;
        $result['error'] = array('message' => $e->getMessage());
      }
    } else {
      $result['result'] = -1;
      $result['error'] = array('message' => "Wrong Code");
    }

    echo(json_encode($result));
?>