class Rosy::Development::Smush
  include Rosy

  def initialize
    @static = "#{STATIC_DIR.gsub!(PROJECT_ROOT + "/", "")}/"
    @dir = File.join(@static, "img")
  end

  def run
    system "smusher #{@dir}"
  end
end
