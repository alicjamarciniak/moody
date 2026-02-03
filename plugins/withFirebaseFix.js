const { withPodfile } = require('@expo/config-plugins');

/**
 * Expo config plugin that fixes non-modular header build errors
 * for React Native Firebase pods when using useFrameworks: "static".
 * See: https://github.com/expo/expo/issues/39607
 */
module.exports = function withFirebaseFix(config) {
  return withPodfile(config, (podfileConfig) => {
    const contents = podfileConfig.modResults.contents;

    const patch = `
    # Fix non-modular header includes in RN Firebase pods with use_frameworks!
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        build_config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        existing = build_config.build_settings['OTHER_CFLAGS'] || '$(inherited)'
        unless existing.is_a?(Array) ? existing.include?('-Wno-non-modular-include-in-framework-module') : existing.include?('-Wno-non-modular-include-in-framework-module')
          if existing.is_a?(Array)
            build_config.build_settings['OTHER_CFLAGS'] = existing + ['-Wno-non-modular-include-in-framework-module']
          else
            build_config.build_settings['OTHER_CFLAGS'] = existing + ' -Wno-non-modular-include-in-framework-module'
          end
        end
      end
    end
`;

    // Insert the patch after react_native_post_install(...) call, before the post_install block's "end"
    // The Podfile structure is:
    //   post_install do |installer|
    //     react_native_post_install(...)
    //   end
    // We insert our code between react_native_post_install() and the closing "end"
    podfileConfig.modResults.contents = contents.replace(
      /(\s+react_native_post_install\([\s\S]*?\n\s+\))\n(\s+end\nend)/,
      `$1\n${patch}  $2`
    );

    return podfileConfig;
  });
};
