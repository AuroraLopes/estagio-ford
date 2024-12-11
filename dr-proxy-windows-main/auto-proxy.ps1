# Proxy URL set from input
$proxy_host="http://internet.ford.com"
$proxy_port="83"
$proxy_host_no_protocol="${proxy_host#*//}"
$proxy_url="${proxy_host}:${proxy_port}"
$no_proxy_list="localhost,127.0.0.1,19.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,10.3.0.0/16,10.2.0.0/16,.pd01i.edc1.cf.ford.com,.pd01.edc1.cf.ford.com,.pp01i.edc1.cf.ford.com,.pp01.edc1.cf.ford.com,.pd01i.edc2.cf.ford.com,.pd01.edc2.cf.ford.com,.pp01i.edc2.cf.ford.com,.pp01.edc2.cf.ford.com,.caas.ford.com,.cluster.local,s3-object.ford.com,.cf.gcp.ford.com,vault.app.ford.com,.labs.ford.com,.nexus.ford.com,github.ford.com"
$java_properties="-Dhttps.proxyHost=${proxy_host_no_protocol} -Dhttps.proxyPort=${proxy_port} -Dhttps.nonProxyHosts='${non_proxy_hosts}' -Dhttp.proxyHost=${proxy_host_no_protocol} -Dhttp.proxyHost=${proxy_port} -Dhttp.nonProxyHosts='${non_proxy_hosts}'"

function UnsetProxy {
  param (
    
  )

  # Terminal proxies
  $Env:http_proxy = ""
  $Env:https_proxy = ""
  $Env:HTTP_PROXY = ""
  $Env:HTTPS_PROXY = ""
  $Env:no_proxy = ""
  $Env:NO_PROXY = ""

  # JVM proxies
  $Env:java_tool_options = ""
  $Env:JAVA_TOOL_OPTIONS = ""

  # NPM Proxies
  npm config --quiet delete proxy
  npm config --quiet delete https-proxy
  npm config --quiet delete noproxy
}

function SetProxy {
  param (
    
  )

  # Terminal proxies
  # NPM also uses these env vars
  $Env:http_proxy = "${proxy_url}"
  $Env:https_proxy = "${proxy_url}"
  $Env:HTTP_PROXY = "${proxy_url}"
  $Env:HTTPS_PROXY = "${proxy_url}"
  $Env:no_proxy = "${no_proxy_list}"
  $Env:NO_PROXY = "${no_proxy_list}"

  # JVM proxies
  $Env:java_tool_options = "${java_properties}"
  $Env:JAVA_TOOL_OPTIONS = "${java_properties}"
}


UnsetProxy

if(Test-Connection -ComputerName www.google.com -Quiet) {
  Write-Output "Off corporate network"
  Write-Output "Proxy settings disabled"
} else {
  SetProxy
  Write-Output "On corporate network"
  Write-Output "Proxy settings enabled"
}