using System.Windows.Forms;
using System.Workflow.Activities.Rules;
using System.Workflow.Activities.Rules.Design;
using Repository;

namespace Original {
	internal class Program {

		private const string Filename = "Test.rules.xml";

		static void Main() {
			FileRepository rep = new FileRepository();
			RuleSet ruleset = rep.Load(Filename);
			RuleSetDialog dialog = new RuleSetDialog(typeof(Person), null, ruleset);
			DialogResult result = dialog.ShowDialog();

			if (result == DialogResult.OK) {
				rep.Save(dialog.RuleSet, Filename);
			}
		}
	}
}