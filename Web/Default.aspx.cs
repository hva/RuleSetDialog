using System;
using System.Web.Services;
using System.Workflow.Activities.Rules;
using Repository;

namespace Web
{
	public partial class Default : System.Web.UI.Page
	{
		[WebMethod]
		public static RuleSet GetRuleSet() {
			FileRepository rep = new FileRepository();
			return rep.Load();
		}

		protected void Page_Load(object sender, EventArgs e) {

		}
	}
}