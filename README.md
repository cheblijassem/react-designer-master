# Symfony 3.4

since we are working with Bundles i chose to work with `Symfony 3.4` because its architecture is based on Bundles unlike newer versions.

# php-jira-rest-client

[php-jira-rest-client](https://github.com/lesstif/php-jira-rest-client) needs a `.env` file that contains all the needed configurations.


Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
JIRA_HOST="https://testinghost.atlassian.net"
JIRA_USER="cheblijassem@gmail.com"
JIRA_PASS="VuCjdmHiHUqdM6V73cRsA548"
JIRA_LOG_ENABLED=true
JIRA_LOG_FILE="jira-rest-client.log"
JIRA_LOG_LEVEL="WARNING"

JIRA_REST_API_V3=false
```

these configurations can be overridden by creating a Service class with an `ArrayConfiguration` parameter.

```php
public function getConfiguration()
    {
        try {
            $iss = new IssueService(new ArrayConfiguration(
                array(
                    'jiraHost' => 'https://your-jira.host.com',
                    // for basic authorization:
                    'jiraUser' => 'cheblijassem@gmail.com',
                    'jiraPassword' => 'VuCjdmHiHUqdM6V73cRsA548',
                    // to enable session cookie authorization (with basic authorization only)
                    'cookieAuthEnabled' => true,
                    'cookieFile' => realpath(__DIR__ . '/../../../../web/upload/jira-cookie.txt'),
                    // if you are behind a proxy, add proxy settings
                    "proxyServer" => 'your-proxy-server',
                    "proxyPort" => 'proxy-port',
                    "proxyUser" => 'proxy-username',
                    "proxyPassword" => 'proxy-password',
                )
            ));
        } catch (JiraException $e) {
            return $e;
        } catch (\Exception $e) {
            return $e;
        }
    }
```

calling `/test` defined in `routing.yaml` invokes the `DefaultController.php`
```yaml
jassem_chebli_test_jira:
    resource: "@JassemChebliTestJiraBundle/Resources/config/routing.yml"
    prefix:   test/
```
### DefaultController.php

```php
<?php
namespace JassemChebli\TestJiraBundle\Controller;
use JassemChebli\TestJiraBundle\Service\ConfigurationService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
class DefaultController extends Controller
{
    public function indexAction()
    {
        $config = new ConfigurationService();
        $message = $config->getConfiguration();
        return new Response(
            '<html lang="en"><body>' . json_encode($message) . '</body></html>'
        );
    }
}
```



# cybermonde/odtphp

[cybermonde/odtphp](https://github.com/cybermonde/odtphp) is a library to quickly generate Open Document Text-files that can be read by a gigantic set of Office Suites, including LibreOffice, OpenOffice and even Microsoft Office from PHP code. It uses a simple templating mechanism. See the tests/ folder for a set of examples.

## createOdtInstance.php

Creating a service that requires the  [Odf.php](https://github.com/cybermonde/odtphp/blob/master/src/Odf.php) class inside the [cybermonde/odtphp](https://github.com/cybermonde/odtphp) library.
among the parameters the most important is the filename specified in the `Odf()` instance creation 

```php
$odt = new odf('tutoriel1.odt');
```

the library offers a lot of models detailed here [Documentation.pdf](https://github.com/cybermonde/odtphp/blob/master/documentation/odtphp_documentation.pdf) according to your needs.


```php
<?php

namespace JassemChebli\OdtBundle\Service;

use Odf;

class OdtService
{
    public function createOdtInstance()
    {
        try {
            $odt = new odf('tutoriel1.odt');
            $odt->setVars('titre', 'PHP');
            $message = "PHP est un lde s l ...";
            $odt->setVars('message', $message);
            $odt->exportAsAttachedFile();
            $messages = 'created successfully';
        } catch (\OdfException $e) {
            $messages = $e;
        }

        return $messages;


    }
}
```

calling `/odt` defined in `routing.yaml` invokes the `DefaultController.php`
```yaml
jassem_chebli_odt:
    resource: "@JassemChebliOdtBundle/Resources/config/routing.yml"
    prefix:   odt/
```
### DefaultController.php

```php
  
<?php

namespace JassemChebli\OdtBundle\Controller;

use JassemChebli\OdtBundle\Service\OdtService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $odtServiceFactory = new OdtService();
        $message = $odtServiceFactory->createOdtInstance();
        return new Response(
            '<html lang="en"><body>' . $message . '</body></html>'
        );
    }
}
```

### Troubleshooting

you may encounter this error `nothing to parse - check that the content.xml file is correctly formed`
which is basically telling you that locating a chosen `filename` model has failed.

the solution is to add this code inside the `Odf.php` class in the library
```php
$this->file = new $zipHandler();
        $newFile = str_replace(".odt", ".zip", '../tests/'.$filename);
        copy(realpath(__DIR__ . '/../tests').'/'.$filename, $newFile);
        $filename = $newFile;
```

under the creation of the zipHandler instance
```php
$this->file = new $zipHandler();
```

just calling the service once fix the error then you can remove any changes made in the `Odf.php` class.