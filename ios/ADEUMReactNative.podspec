require 'json'
version = JSON.parse(File.read('../package.json'))["version"]

Pod::Spec.new do |s|

  s.name         = "ADEUMReactNative"
  s.version      = version
  s.summary      = "Real User Monitoring for React Native with AppDynamics"
  s.homepage     = "https://docs.appdynamics.com"
  s.license      = "Apache-2.0"
  s.author       = { "AppDynamics" => "info@appdynamics.com" }
  s.platform     = :ios, "8.0"
  s.source       = { :path => "ADEUMReactNative/**/*.{h,m}" }
  s.preserve_paths = "**/*.js"
  s.dependency "React"
  s.dependency "AppDynamicsAgent"

end
