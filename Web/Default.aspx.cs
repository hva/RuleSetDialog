using System;
using System.Web.Hosting;
using System.Web.Services;
using System.Workflow.Activities.Rules;
using Repository;

namespace Web
{
	public partial class Default : System.Web.UI.Page
	{
		private static readonly string Filename = HostingEnvironment.MapPath("~/Test.rules.xml");
		private static readonly FileRepository Repository = new FileRepository();

		[WebMethod]
		public static RuleSet LoadRuleSet()
		{
			return Repository.Load(Filename);
		}

		[WebMethod]
		public static void SaveRuleSet(RuleSet ruleSet) {
			Repository.Save(ruleSet, Filename);
		}


		protected void Page_Load(object sender, EventArgs e) {

		}
	}
}