using System;
using System.Web.Hosting;
using System.Web.Services;
using Repository;

namespace Web
{
	public partial class Default : System.Web.UI.Page
	{
		private static readonly string Filename = HostingEnvironment.MapPath("~/Data/Test.rules.xml");
		private static readonly FileRepository Repository = new FileRepository();

		[WebMethod]
		public static RuleSetContract LoadRuleSet()
		{
			return Repository.Load(Filename).Serialize();
		}

		[WebMethod]
		public static void SaveRuleSet(RuleSetContract ruleSet) {
			Repository.Save(ruleSet.Deserialize(), Filename);
		}

		protected void Page_Load(object sender, EventArgs e) {

		}
	}
}